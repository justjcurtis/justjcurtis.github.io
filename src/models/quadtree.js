/**
 * A generic quadtree implementation for 2D spatial partitioning
 * Assumes items have a pos property with x and y coordinates
 */
class QuadTree {
    /**
     * Create a new QuadTree
     * @param {Object} boundary - The boundary of this node
     * @param {number} boundary.x - X coordinate of the center
     * @param {number} boundary.y - Y coordinate of the center
     * @param {number} boundary.width - Width of the boundary
     * @param {number} boundary.height - Height of the boundary
     * @param {number} capacity - Maximum number of items before subdivision
     * @param {number} maxDepth - Maximum depth of the tree
     * @param {number} depth - Current depth of this node
     */
    constructor(boundary, capacity = 10, maxDepth = 50, depth = 0) {
        this.boundary = boundary;
        // Pre-calculate boundary edges for faster containment checks
        const halfWidth = boundary.width * 0.5;
        const halfHeight = boundary.height * 0.5;
        this.left = boundary.x - halfWidth;
        this.right = boundary.x + halfWidth;
        this.top = boundary.y - halfHeight;
        this.bottom = boundary.y + halfHeight;
        this.capacity = capacity;
        this.maxDepth = maxDepth;
        this.depth = depth;
        this.items = [];
        this.divided = false;
        this.children = null; // Initialize only when needed
        this.itemCount = 0; // Track total items for faster counting
    }

    /**
     * Subdivide this node into four quadrants
     */
    subdivide() {
        const x = this.boundary.x;
        const y = this.boundary.y;
        const w = this.boundary.width * 0.5;
        const h = this.boundary.height * 0.5;
        const quarterW = w * 0.5;
        const quarterH = h * 0.5;
        const nextDepth = this.depth + 1;

        // Only create children array when needed
        this.children = {
            northWest: new QuadTree({ x: x - quarterW, y: y - quarterH, width: w, height: h }, this.capacity, this.maxDepth, nextDepth),
            northEast: new QuadTree({ x: x + quarterW, y: y - quarterH, width: w, height: h }, this.capacity, this.maxDepth, nextDepth),
            southWest: new QuadTree({ x: x - quarterW, y: y + quarterH, width: w, height: h }, this.capacity, this.maxDepth, nextDepth),
            southEast: new QuadTree({ x: x + quarterW, y: y + quarterH, width: w, height: h }, this.capacity, this.maxDepth, nextDepth)
        };

        this.divided = true;

        // Redistribute existing items to children using a faster approach
        const items = this.items;
        const itemsLength = items.length;

        // Track how many items were successfully inserted into children
        let insertedCount = 0;

        for (let i = 0; i < itemsLength; i++) {
            if (this.insertToChildren(items[i])) {
                insertedCount++;
            }
        }

        // Update item count
        this.itemCount = insertedCount;
        this.items.length = 0;
    }

    /**
     * Check if a point is within the boundary
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     * @returns {boolean} - True if the point is in the boundary
     */
    contains(x, y) {
        // Use pre-calculated boundary edges for faster checks
        return x >= this.left && x < this.right && y >= this.top && y < this.bottom;
    }

    /**
     * Insert an item into the appropriate child
     * @param {Object} item - The item to insert
     * @returns {boolean} - True if the item was inserted
     */
    insertToChildren(item) {
        const x = item.pos.x;
        const y = item.pos.y;
        const midX = this.boundary.x;
        const midY = this.boundary.y;

        // Determine quadrant directly without multiple containment checks
        const inNorth = y < midY;
        const inWest = x < midX;

        let child;
        if (inNorth) {
            child = inWest ? this.children.northWest : this.children.northEast;
        } else {
            child = inWest ? this.children.southWest : this.children.southEast;
        }

        return child.insert(item);
    }

    /**
     * Insert an item into the quadtree
     * @param {Object} item - The item to insert (must have pos.x and pos.y)
     * @returns {boolean} - True if the item was inserted
     */
    insert(item) {
        const x = item.pos.x;
        const y = item.pos.y;

        // Fast path: skip type checking in hot code
        // Check if this item fits within this quad
        if (!(x >= this.left && x < this.right && y >= this.top && y < this.bottom)) {
            return false;
        }

        // If there's space in this quad and we haven't divided, add the item here
        if (this.items.length < this.capacity || this.depth >= this.maxDepth) {
            this.items.push(item);
            this.itemCount++;
            return true;
        }

        // Otherwise, subdivide and then add the item to whichever node will accept it
        if (!this.divided) {
            this.subdivide();
        }

        // Try to insert into children
        const inserted = this.insertToChildren(item);
        if (inserted) {
            this.itemCount++;
        }
        return inserted;
    }

    /**
     * Query all items within a rectangular region
     * @param {Object} range - The query range
     * @param {number} range.x - X coordinate of the center
     * @param {number} range.y - Y coordinate of the center
     * @param {number} range.width - Width of the range
     * @param {number} range.height - Height of the range
     * @returns {Array} - Array of items in the range
     */
    queryRange(range) {
        // Pre-calculate range boundaries for faster checks
        const rangeLeft = range.x - range.width / 2;
        const rangeRight = range.x + range.width / 2;
        const rangeTop = range.y - range.height / 2;
        const rangeBottom = range.y + range.height / 2;

        // Use a single array for results to avoid array concatenation
        const found = [];
        this._queryRange(range, rangeLeft, rangeRight, rangeTop, rangeBottom, found);
        return found;
    }

    /**
     * Internal method to query range with pre-calculated boundaries
     * @private
     */
    _queryRange(range, rangeLeft, rangeRight, rangeTop, rangeBottom, found) {
        // Abort if the range does not intersect this quad
        if (this.right < rangeLeft || this.left > rangeRight ||
            this.bottom < rangeTop || this.top > rangeBottom) {
            return;
        }

        // Check items at this level
        const itemsLength = this.items.length;
        for (let i = 0; i < itemsLength; i++) {
            const item = this.items[i];
            const x = item.pos.x;
            const y = item.pos.y;

            if (x >= rangeLeft && x < rangeRight && y >= rangeTop && y < rangeBottom) {
                found.push(item);
            }
        }

        // Terminate here if there are no children
        if (!this.divided) {
            return;
        }

        // Otherwise, add the results from the children
        this.children.northWest._queryRange(range, rangeLeft, rangeRight, rangeTop, rangeBottom, found);
        this.children.northEast._queryRange(range, rangeLeft, rangeRight, rangeTop, rangeBottom, found);
        this.children.southWest._queryRange(range, rangeLeft, rangeRight, rangeTop, rangeBottom, found);
        this.children.southEast._queryRange(range, rangeLeft, rangeRight, rangeTop, rangeBottom, found);
    }

    /**
     * Find all items within a certain radius of a point
     * @param {number} x - X coordinate of the center
     * @param {number} y - Y coordinate of the center
     * @param {number} radius - Radius to search within
     * @returns {Array} - Array of items within the radius
     */
    queryRadius(x, y, radius, limit = Infinity) {
        // Pre-calculate for faster checks
        const radiusSquared = radius * radius;
        const rangeLeft = x - radius;
        const rangeRight = x + radius;
        const rangeTop = y - radius;
        const rangeBottom = y + radius;

        // Use a single array for results
        const found = [];

        // Get all items in the square range and filter in one pass
        this._queryRadiusOptimized(x, y, radius, radiusSquared,
            rangeLeft, rangeRight, rangeTop, rangeBottom, found, limit);

        return found;
    }

    /**
     * Optimized internal method for radius queries
     * @private
     */
    _queryRadiusOptimized(centerX, centerY, radius, radiusSquared,
        rangeLeft, rangeRight, rangeTop, rangeBottom, found, limit = Infinity) {
        // Abort if the range does not intersect this quad
        if (this.right < rangeLeft || this.left > rangeRight ||
            this.bottom < rangeTop || this.top > rangeBottom) {
            return;
        }

        // Check items at this level
        const itemsLength = this.items.length;
        for (let i = 0; i < itemsLength; i++) {
            const item = this.items[i];
            const x = item.pos.x;
            const y = item.pos.y;

            // First do a quick bounding box check
            if (x >= rangeLeft && x < rangeRight && y >= rangeTop && y < rangeBottom) {
                // Then do the more expensive circle check
                const dx = x - centerX;
                const dy = y - centerY;
                if (dx * dx + dy * dy <= radiusSquared) {
                    found.push(item);
                    if (found.length >= limit) return;
                }
            }
        }

        // Terminate here if there are no children
        if (!this.divided) {
            return;
        }

        // Otherwise, add the results from the children
        this.children.northWest._queryRadiusOptimized(centerX, centerY, radius, radiusSquared,
            rangeLeft, rangeRight, rangeTop, rangeBottom, found, limit);
        this.children.northEast._queryRadiusOptimized(centerX, centerY, radius, radiusSquared,
            rangeLeft, rangeRight, rangeTop, rangeBottom, found, limit);
        this.children.southWest._queryRadiusOptimized(centerX, centerY, radius, radiusSquared,
            rangeLeft, rangeRight, rangeTop, rangeBottom, found, limit);
        this.children.southEast._queryRadiusOptimized(centerX, centerY, radius, radiusSquared,
            rangeLeft, rangeRight, rangeTop, rangeBottom, found, limit);
    }

    /**
     * Clear all items from the quadtree
     */
    clear() {
        this.items.length = 0;
        this.itemCount = 0;

        if (this.divided) {
            this.children.northWest.clear();
            this.children.northEast.clear();
            this.children.southWest.clear();
            this.children.southEast.clear();
            this.divided = false;
            this.children = null; // Save memory
        }
    }

    isEmpty() {
        return this.itemCount === 0;
    }

    count() {
        return this.itemCount;
    }

    purgeEmpty(merge = false) {
        if (!this.divided) return;

        // Early exit if this node has no items at all
        if (this.itemCount === 0) {
            this.divided = false;
            this.children = null;
            return;
        }

        // Fast path: if all items are in this node's direct items array
        if (this.items.length === this.itemCount) {
            return;
        }

        // Recursively purge children
        const children = this.children;
        children.northWest.purgeEmpty();
        children.northEast.purgeEmpty();
        children.southWest.purgeEmpty();
        children.southEast.purgeEmpty();

        // Check if all children are empty - fast path using itemCount
        if (children.northWest.itemCount === 0 &&
            children.northEast.itemCount === 0 &&
            children.southWest.itemCount === 0 &&
            children.southEast.itemCount === 0) {
            this.divided = false;
            this.children = null;
            return;
        }


        // If few enough items, consolidate them into this node
        if (merge && this.itemCount <= this.capacity) {
            const childItemCount = this.itemCount - this.items.length;
            if (childItemCount <= this.capacity) {
                // Pre-allocate space in items array
                const newItems = new Array(this.itemCount);
                let index = 0;

                // Copy current items
                const currentItems = this.items;
                const currentLength = currentItems.length;
                for (let i = 0; i < currentLength; i++) {
                    newItems[index++] = currentItems[i];
                }

                // Collect items from children directly
                this._fastCollectItems(children.northWest, newItems, index);
                index += children.northWest.itemCount;

                this._fastCollectItems(children.northEast, newItems, index);
                index += children.northEast.itemCount;

                this._fastCollectItems(children.southWest, newItems, index);
                index += children.southWest.itemCount;

                this._fastCollectItems(children.southEast, newItems, index);

                // Replace items array
                this.items = newItems;
                this.divided = false;
                this.children = null;
            }
        }
    }

    /**
     * Fast item collection from a node and its children
     * @private
     */
    _fastCollectItems(node, targetArray, startIndex) {
        // Copy direct items
        let index = startIndex;
        const nodeItems = node.items;
        const nodeItemsLength = nodeItems.length;

        for (let i = 0; i < nodeItemsLength; i++) {
            targetArray[index++] = nodeItems[i];
        }

        // If not divided, we're done
        if (!node.divided) return;

        // Otherwise collect from children
        const children = node.children;
        this._fastCollectItems(children.northWest, targetArray, index);
        index += children.northWest.itemCount;

        this._fastCollectItems(children.northEast, targetArray, index);
        index += children.northEast.itemCount;

        this._fastCollectItems(children.southWest, targetArray, index);
        index += children.southWest.itemCount;

        this._fastCollectItems(children.southEast, targetArray, index);
    }
}

export default QuadTree;

