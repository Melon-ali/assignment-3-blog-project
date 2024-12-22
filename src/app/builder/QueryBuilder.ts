import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const search = this?.query?.search;
    if (search) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: search, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }

  authorFiltering() {
    const author = this?.query?.filter;
    if (author) {
      this.modelQuery = this.modelQuery.find({
        author: author,
      });
    }
    return this;
  }

  filter() {
    const queryObj = { ...this.query };

    const excludeFields = [
      'search',
      'sortBy',
      'sortOrder',
      'limit',
      'page',
      'fields',
      'filter',
    ];

    excludeFields.forEach((el) => delete queryObj[el]);

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);

    return this;
  }

  sortBy() {
    const sortBy = this.query?.sortBy as string;
    if (sortBy) {
      const sort = sortBy?.split(',')?.join(' ') || 'createdAt';
      this.modelQuery = this.modelQuery.sort(sort as string);
    }
    return this;
  }
  sortOrder() {
    const sortOrder = this.query?.sortOrder;
    if (sortOrder === 'desc') {
      this.modelQuery.sort({ createdAt: -1 });
    } else if (sortOrder === 'asc') {
      this.modelQuery.sort({ createdAt: 1 });
    }

    return this;
  }
}

export default QueryBuilder;