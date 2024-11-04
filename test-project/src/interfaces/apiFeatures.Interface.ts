interface APIFeatures {
  columns: string[];
  filter(): this;
  sort(): this;
  paginate(): this;
}

export default APIFeatures;
