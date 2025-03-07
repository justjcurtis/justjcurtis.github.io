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
    constructor(boundary, capacity = 4, maxDepth = 8, depth = 0) {
        this.boundary = boundary;
        this.capacity = capacity;
        this.maxDepth = maxDepth;
        this.depth = depth;
        this.items = [];
        this.divided = false;
        this.children = {
            northWest: null,
            northEast: null,
            southWest: null,
            southEast: null
        };
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

        const nw = { x: x - w / 2, y: y - h / 2, width: w, height: h };
        const ne = { x: x + w / 2, y: y - h / 2, width: w, height: h };
        const sw = { x: x - w / 2, y: y + h / 2, width: w, height: h };
        const se = { x: x + w / 2, y: y + h / 2, width: w, height: h };

        this.children.northWest = new QuadTree(nw, this.capacity, this.maxDepth, nextDepth);
        this.children.northEast = new QuadTree(ne, this.capacity, this.maxDepth, nextDepth);
        this.children.southWest = new QuadTree(sw, this.capacity, this.maxDepth, nextDepth);
        this.children.southEast = new QuadTree(se, this.capacity, this.maxDepth, nextDepth);

        this.divided = true;

        // Redistribute existing items to children
        for (const item of this.items) {
            this.insertToChildren(item);
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
        return (
            x >= this.boundary.x - this.boundary.width / 2 &&
            x < this.boundary.x + this.boundary.width / 2 &&
            y >= this.boundary.y - this.boundary.height / 2 &&
            y < this.boundary.y + this.boundary.height / 2
        );
    }

    /**
     * Insert an item into the appropriate child
     * @param {Object} item - The item to insert
     * @returns {boolean} - True if the item was inserted
     */
    insertToChildren(item) {
        const x = item.pos.x;
        const y = item.pos.y;

        if (this.children.northWest.contains(x, y)) {
            return this.children.northWest.insert(item);
        } else if (this.children.northEast.contains(x, y)) {
            return this.children.northEast.insert(item);
        } else if (this.children.southWest.contains(x, y)) {
            return this.children.southWest.insert(item);
        } else if (this.children.southEast.contains(x, y)) {
            return this.children.southEast.insert(item);
        }

        // If the item doesn't fit in any child (due to floating point errors)
        // we'll keep it in this node
        return false;
    }

    /**
     * Insert an item into the quadtree
     * @param {Object} item - The item to insert (must have pos.x and pos.y)
     * @returns {boolean} - True if the item was inserted
     */
    insert(item) {
        // Check if item has the required pos property
        if (!item.pos || typeof item.pos.x !== 'number' || typeof item.pos.y !== 'number') {
            return false;
        }

        // Check if this item fits within this quad
        if (!this.contains(item.pos.x, item.pos.y)) {
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
        const found = [];

        // Abort if the range does not intersect this quad
        if (!this.intersects(range)) {
            return found;
        }

        // Check items at this level
        for (const item of this.items) {
            if (this.itemInRange(item, range)) {
                found.push(item);
            }
        }

        // Terminate here if there are no children
        if (!this.divided) {
            return found;
        }

        // Otherwise, add the results from the children
        found.push(...this.children.northWest.queryRange(range));
        found.push(...this.children.northEast.queryRange(range));
        found.push(...this.children.southWest.queryRange(range));
        found.push(...this.children.southEast.queryRange(range));

        return found;
    }

    /**
     * Check if an item is within a range
     * @param {Object} item - The item to check
     * @param {Object} range - The range to check against
     * @returns {boolean} - True if the item is in the range
     */
    itemInRange(item, range) {
        return (
            item.pos.x >= range.x - range.width / 2 &&
            item.pos.x < range.x + range.width / 2 &&
            item.pos.y >= range.y - range.height / 2 &&
            item.pos.y < range.y + range.height / 2
        );
    }

    /**
     * Check if this quad intersects with a range
     * @param {Object} range - The range to check
     * @returns {boolean} - True if the ranges intersect
     */
    intersects(range) {
        return !(
            range.x - range.width / 2 > this.boundary.x + this.boundary.width / 2 ||
            range.x + range.width / 2 < this.boundary.x - this.boundary.width / 2 ||
            range.y - range.height / 2 > this.boundary.y + this.boundary.height / 2 ||
            range.y + range.height / 2 < this.boundary.y - this.boundary.height / 2
        );
    }

    /**
     * Find all items within a certain radius of a point
     * @param {number} x - X coordinate of the center
     * @param {number} y - Y coordinate of the center
     * @param {number} radius - Radius to search within
     * @returns {Array} - Array of items within the radius
     */
    queryRadius(x, y, radius) {
        // Create a square range that contains the circle
        const range = {
            x: x,
            y: y,
            width: radius * 2,
            height: radius * 2
        };

        // Get all items in the square range
        const itemsInRange = this.queryRange(range);

        // Filter to keep only items within the radius
        return itemsInRange.filter(item => {
            const dx = item.pos.x - x;
            const dy = item.pos.y - y;
            const distSquared = dx * dx + dy * dy;
            return distSquared <= radius * radius;
        });
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
            this.children = {
                northWest: null,
                northEast: null,
                southWest: null,
                southEast: null
            };
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

        return count
    }

    purgeEmpty() {
        if (this.divided) {
            this.children.northWest.purgeEmpty();
            this.children.northEast.purgeEmpty();
            this.children.southWest.purgeEmpty();
            this.children.southEast.purgeEmpty();

            const childKeys = Object.keys(this.children);
            const emptyChildren = childKeys.filter(key => this.children[key].isEmpty());

            if (emptyChildren.length === childKeys.length) {
                this.divided = false;
                this.children = {
                    northWest: null,
                    northEast: null,
                    southWest: null,
                    southEast: null
                };
                return;
            }

            const subCount = emptyChildren.reduce((acc, key) => acc + this.children[key].count(), 0);
            if (subCount <= this.capacity) {
                this.items.push(...emptyChildren.flatMap(key => this.children[key].items));
                this.divided = false;
                this.children = {
                    northWest: null,
                    northEast: null,
                    southWest: null,
                    southEast: null
                };
            }
        }
    }
}

export default QuadTree;

