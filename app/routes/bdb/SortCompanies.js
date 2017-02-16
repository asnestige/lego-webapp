
const sortByAttribute = (attribute) => (ascending) => (a, b) => {
  if (a[attribute] === b[attribute]) {
    return a.name.localeCompare(b.name);
  }
  if (a[attribute].fullName) {
    return ascending ? a[attribute].fullName.localeCompare(b[attribute].fullName) :
        b[attribute].fullName.localeCompare(a[attribute].fullName);
  }
  return ascending ? a[attribute].localeCompare(b[attribute]) :
      b[attribute].localeCompare(a[attribute]);
};

const sortByContactStatus = (index, startYear, startSem) => (ascending) => (a, b) => {
  // Index is either 0, 1 or 2: it's displayed left, middle or right in the table
  // startYear and startSem is the year and semester of the leftmost status
  const semester = ((index % 2) + startSem) % 2;

  let year = 0;
  if (startSem === 0) {
    year = index < 2 ? startYear : startYear + 1;
  } else if (index === 0) {
    year = startYear;
  } else {
    year = startYear + 1;
  }

  const semesterA = a.semesterStatuses.find((obj) =>
    obj.year === year && obj.semester === semester
  ); const statusA = semesterA ? semesterA.contactedStatus : 6;

  const semesterB = b.semesterStatuses.find((obj) =>
    obj.year === year && obj.semester === semester
  ); const statusB = semesterB ? semesterB.contactedStatus : 6;

  if (statusA === statusB) {
    return a.name.localeCompare(b.name);
  }
  if (ascending) {
    return statusA - statusB;
  } return statusB - statusA;
};

const sortCompanies = (companies, query, startYear, startSem) => {
  const sortType = query.sortBy;
  const ascending = query.ascending === 'true';
  const sortTypeToFunction = {
    name: sortByAttribute('name'),
    sem0: sortByContactStatus(0, startYear, startSem),
    sem1: sortByContactStatus(1, startYear, startSem),
    sem2: sortByContactStatus(2, startYear, startSem),
    studentContact: sortByAttribute('studentContact'),
    comment: sortByAttribute('adminComment')
  };

  const sortTypeName = Object.keys(sortTypeToFunction).find((sortTypeName) =>
    sortTypeName === sortType);
  const sortFunction = sortTypeName ? sortTypeToFunction[sortTypeName](ascending) :
    sortTypeToFunction.name(true)
  return companies.sort(sortFunction);
};

export default sortCompanies;