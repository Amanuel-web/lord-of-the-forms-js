import { capitalize, formattedPhone } from "./utils/transformations";

export const InfoRow = ({ label, value }) => {
  return (
    <div>
      <span style={{ marginRight: 5 }}>
        <b>{label}:</b>
      </span>
      <span>{value}</span>
    </div>
  );
};

export const ProfileInformation = ({ userData }) => {
  if (!userData) {
    return (
      <>
        <u>
          <h3>Your Submitted User Information</h3>
        </u>
        <div className="user-info">
          <div>No information provided</div>
        </div>
      </>
    );
  }

  console.log("userData:", userData);

  const { email, firstName, lastName, phone, city } = userData;

  console.log("Formatted First Name:", capitalize(firstName));
  console.log("Formatted Last Name:", capitalize(lastName));

  return (
    <>
      <u>
        <h3>Your Submitted User Information</h3>
      </u>
      <div className="user-info">
        <InfoRow label="Email" value={email} />
        <InfoRow label="First Name" value={"dddd"} />
        <InfoRow label="Last Name" value={capitalize(lastName)} />
        <InfoRow label="City" value={city} />
        <InfoRow label="Phone" value={formattedPhone(phone)} />
      </div>
    </>
  );
};
