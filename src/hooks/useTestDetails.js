import { useSelector, useDispatch } from 'react-redux';
import { fetchTestDetails, clearTestDetails } from '../features/user/tests/testDetailsSlice';
import { useEffect } from 'react';

// Custom hook for managing individual test details
export const useTestDetails = (testId) => {
  const dispatch = useDispatch();
  const testDetailsState = useSelector((state) => 
    state.testDetails.byTestId[testId] || {
      testDetails: null,
      loading: false,
      error: null,
    }
  );

  const { testDetails, loading, error } = testDetailsState;

  useEffect(() => {
    if (testId && !testDetails && !loading) {
      dispatch(fetchTestDetails(testId));
    }
  }, [dispatch, testId, testDetails, loading]);

  const refetch = () => {
    if (testId) {
      dispatch(fetchTestDetails(testId));
    }
  };

  const clear = () => {
    dispatch(clearTestDetails(testId));
  };

  return {
    testDetails,
    loading,
    error,
    refetch,
    clear,
  };
};

export default useTestDetails;
