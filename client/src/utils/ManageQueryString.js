export const getGeneratedQueryString = ({
  query,
  sortBy,
  sortOrder,
  selectedOffice,
  contactLists,
}) => {
  const queryParam = new URLSearchParams();

  // query
  if (query) queryParam.append("q", query);
  else queryParam.delete("q");

  // sortBy
  if (sortBy && sortOrder) {
    queryParam.append("sortBy", sortBy);
    queryParam.append("sortOrder", sortOrder);
  } else {
    queryParam.delete("sortBy");
    queryParam.delete("sortOrder");
  }

  // office
  if (selectedOffice) queryParam.append("office", selectedOffice);
  else queryParam.delete("office");

  // contact links
  if (contactLists.length > 0) {
    contactLists.forEach((link) => queryParam.append("cl", link));
  } else queryParam.delete("cl");

  return queryParam.toString();
};

export const getGeneratedQueryStringForApiCall = ({
  page = 1,
  perPage = 12,
  query,
  sortBy,
  sortOrder,
  office,
  contactLinks,
}) => {
  const queryParam = new URLSearchParams();

  // page
  if (page) queryParam.append("page", page);
  else query.delete("page");

  // perPage
  if (perPage) queryParam.append("perPage", perPage);
  else queryParam.append("perPage", 12);

  // query
  if (query) queryParam.append("name", query);
  else queryParam.delete("name");

  // office
  if (office) queryParam.append("office", office);
  else queryParam.delete("office");

  // sort
  if (sortBy && sortOrder) {
    queryParam.append("sortBy", sortBy);
    queryParam.append("sortDirection", sortOrder);
  } else {
    queryParam.delete("sortBy");
    queryParam.delete("sortOrder");
  }

  // contact links
  if (contactLinks?.length > 0) {
    contactLinks.forEach((link) => queryParam.append("contactLinks", link));
  } else queryParam.delete("contactLinks");

  return queryParam.toString();
};
