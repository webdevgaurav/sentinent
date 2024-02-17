const NoRecordFound = () => {
  return (
    <div className="container">
      <div className="alert alert-info" role="alert">
        <h4 className="alert-heading">No Record Found</h4>
        <p>No record matching your search criteria was found.</p>
        <hr />
        <p className="mb-0">Please try again with different search criteria.</p>
      </div>
    </div>
  );
};

export default NoRecordFound;
