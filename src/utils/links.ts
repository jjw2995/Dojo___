const withBistroId = (bistroId: string) => {
  return {
    home: `/bistro/${bistroId}/home`,
    pay: `/bistro/${bistroId}/pay`,
    menu: `/bistro/${bistroId}/menu`,
  };
};

export const LINKS = {
  base: "/",
  bistro: "/bistro",
  withBistroId,
};
