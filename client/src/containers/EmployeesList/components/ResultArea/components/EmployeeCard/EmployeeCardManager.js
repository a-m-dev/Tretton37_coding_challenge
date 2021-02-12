import { useMemo } from "react";
import { useResultAreaContext } from "../../context";
import { ListViewTypes } from "../../../../../../constants";
import getContactListLinks from "../../../../../../utils/getContactListLinks";

const EmployeeCardManager = ({
  _id,
  name,
  email,
  office,
  phoneNumber,
  orgUnit,
  tagLine,
  gitHub,
  stackOverflow,
  linkedIn,
  twitter,
  highlighted,
  imageBodyUrl,
  imagePortraitUrl,
  imageWallOfLeetUrl,
  mainText,
  manager,
}) => {
  const {
    data: { listViewType },
  } = useResultAreaContext();

  const getCardClass = useMemo(() => {
    let result = "employee-card";
    if (listViewType === ListViewTypes.LIST) result += " employee-card--list";
    else if (listViewType === ListViewTypes.GRID)
      result += " employee-card--grid";
    return result;
  }, [listViewType]);

  const getContactLinks = useMemo(() => {
    return getContactListLinks({ twitter, linkedIn, gitHub, stackOverflow });
  }, [twitter, linkedIn, gitHub, stackOverflow]);

  return {
    data: { getCardClass, getContactLinks },
    actions: {},
  };
};

export default EmployeeCardManager;
