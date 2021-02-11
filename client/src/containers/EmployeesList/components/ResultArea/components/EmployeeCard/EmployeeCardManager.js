import { useMemo } from "react";
import { useResultAreaContext } from "../../context";
import { ListViewTypes } from "../../../../../../constants";

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
    let resultLinks = [];

    if (linkedIn)
      resultLinks.push({
        label: "linkedIn",
        icon: "icon-linkedin",
        link: `https://www.linkedin.com/${linkedIn}`,
      });

    if (twitter)
      resultLinks.push({
        label: "twitter",
        icon: "icon-twitter",
        link: `https://www.twitter.com/${twitter}`,
      });

    if (gitHub)
      resultLinks.push({
        label: "gitHub",
        icon: "icon-github-circled",
        link: `https://www.github.com/${gitHub}`,
      });

    if (stackOverflow)
      resultLinks.push({
        label: "gitHub",
        icon: "icon-stackoverflow",
        link: `https://www.stackoverflow.com/users/${stackOverflow}`,
      });
    return resultLinks.map((el, i) => ({ id: i, ...el }));
  }, [twitter, linkedIn, gitHub, stackOverflow]);

  return {
    data: { getCardClass, getContactLinks },
    actions: {},
  };
};

export default EmployeeCardManager;
