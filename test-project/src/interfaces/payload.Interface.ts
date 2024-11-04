interface IPayload {
  skip: number;
  take: number;
  order: { [key: string]: string };
  where: any[];
  select: string[];
  relations: string[];
}

export default IPayload;
