const getContactListLinks = ({
  linkedIn = "",
  twitter = "",
  gitHub = "",
  stackOverflow = "",
}) => {
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
};

export default getContactListLinks;
