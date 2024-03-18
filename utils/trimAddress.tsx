export const trimAddress = (address: string, start: number, end: number) => {
  return `${address.substring(0, start)}...${address.substring(
    address.length - end
  )}`;
};
