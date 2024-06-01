export const capitalize = (name) => {
  // todo: build this function
  // `capitalize("jOn")` should output `"Jon"`

  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
};

export const formattedPhone = (phone) => {
  // todo: build this function
  // `formatPhoneNumber("1234567")` should be `"12-34-56-7"`

  return `${phone.slice(0, 2)}-${phone.slice(2, 4)}-${phone.slice(
    4,
    6
  )}-${phone.slice(6)}`;
};
