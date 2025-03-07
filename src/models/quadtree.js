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
    constructor(boundary, capacity = 8, maxDepth = 6, depth = 0) {
        this.boundary = boundary;
        // Pre-calculate boundary edges for faster containment checks
        this.left = boundary.x - boundary.width / 2;
        this.right = boundary.x + boundary.width / 2;
        this.top = boundary.y - boundary.height / 2;
        this.bottom = boundary.y + boundary.height / 2;
        this.capacity = capacity;
        this.maxDepth = maxDepth;
        this.depth = depth;
        this.items = [];
        this.divided = false;
        this.children = null; // Initialize only when needed
    }

    /**
     * Subdivide this node into four quadrants
     */
    subdivide() {
        const x = this.boundary.x;
        const y = this.boundary.y;
        const w = this.boundary.width / 2;
        const h = this.boundary.height / 2;
        const nextDepth = this.depth + 1;

        // Only create children array when needed
        this.children = {
            northWest: new QuadTree({ x: x - w / 2, y: y - h / 2, width: w, height: h }, this.capacity, this.maxDepth, nextDepth),
            northEast: new QuadTree({ x: x + w / 2, y: y - h / 2, width: w, height: h }, this.capacity, this.maxDepth, nextDepth),
            southWest: new QuadTree({ x: x - w / 2, y: y + h / 2, width: w, height: h }, this.capacity, this.maxDepth, nextDepth),
            southEast: new QuadTree({ x: x + w / 2, y: y + h / 2, width: w, height: h }, this.capacity, this.maxDepth, nextDepth)
        };

        this.divided = true;

        // Redistribute existing items to children using a faster approach
        const itemsLength = this.items.length;
        for (let i = 0; i < itemsLength; i++) {
            this.insertToChildren(this.items[i]);
        }
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
            return true;
        }

        // Otherwise, subdivide and then add the item to whichever node will accept it
        if (!this.divided) {
            this.subdivide();
        }

        // Try to insert into children
        return this.insertToChildren(item);
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

    // These methods are now inlined in _queryRange for better performance

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
        if (this.items.length > 0) {
            return false;
        }

        if (this.divided) {
            return (
                this.children.northWest.isEmpty() &&
                this.children.northEast.isEmpty() &&
                this.children.southWest.isEmpty() &&
                this.children.southEast.isEmpty()
            );
        }

        return true;
    }

    count() {
        let count = this.items.length;

        if (this.divided) {
            count += this.children.northWest.count();
            count += this.children.northEast.count();
            count += this.children.southWest.count();
            count += this.children.southEast.count();
        }

        return count;
    }

    purgeEmpty() {
        if (this.divided) {
            this.children.northWest.purgeEmpty();
            this.children.northEast.purgeEmpty();
            this.children.southWest.purgeEmpty();
            this.children.southEast.purgeEmpty();

            // Check if all children are empty
            if (this.children.northWest.isEmpty() &&
                this.children.northEast.isEmpty() &&
                this.children.southWest.isEmpty() &&
                this.children.southEast.isEmpty()) {
                this.divided = false;
                this.children = null;
                return;
            }

            // Fixed child keys for faster access
            const childKeys = ['northWest', 'northEast', 'southWest', 'southEast'];
            const nonEmptyChildren = [];
            let subCount = 0;

            // Count items in non-empty children
            for (let i = 0; i < 4; i++) {
                const key = childKeys[i];
                const child = this.children[key];
                if (!child.isEmpty()) {
                    nonEmptyChildren.push(key);
                    subCount += child.count();
                }
            }

            // If few enough items, consolidate them into this node
            if (subCount <= this.capacity) {
                // Collect items from non-empty children
                for (let i = 0; i < nonEmptyChildren.length; i++) {
                    const child = this.children[nonEmptyChildren[i]];
                    const childItems = child.items;
                    const childItemsLength = childItems.length;

                    // Add items directly to avoid spread operator
                    for (let j = 0; j < childItemsLength; j++) {
                        this.items.push(childItems[j]);
                    }

                    // Also get items from any subdivided children
                    if (child.divided) {
                        this._collectItemsFromChildren(child, this.items);
                    }
                }

                this.divided = false;
                this.children = null;
            }
        }
    }

    /**
     * Helper method to collect items from all children recursively
     * @private
     */
    _collectItemsFromChildren(node, targetArray) {
        if (!node.divided) return;

        const childKeys = ['northWest', 'northEast', 'southWest', 'southEast'];
        for (let i = 0; i < 4; i++) {
            const child = node.children[childKeys[i]];
            const childItems = child.items;
            const childItemsLength = childItems.length;

            for (let j = 0; j < childItemsLength; j++) {
                targetArray.push(childItems[j]);
            }

            if (child.divided) {
                this._collectItemsFromChildren(child, targetArray);
            }
        }
    }
}

export default QuadTree;

