interface IPayload {
  skip: number;
  take: number;
  order: { [key: string]: string };
  where: Partial<[{ [key: string]: any }]>;
  select: string[];
}

export default IPayload;
