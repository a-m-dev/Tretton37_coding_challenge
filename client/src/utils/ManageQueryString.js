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

export const getSearchConfigFromQueryString = (queryString) => {};
