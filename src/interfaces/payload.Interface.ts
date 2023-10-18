interface IPayload {
  skip: number;
  take: number;
  order: { [key: string]: 'ASC' | 'DESC' };
  page: string;
  where: { [key: string]: any };
  select: string[];
}

export default IPayload;
