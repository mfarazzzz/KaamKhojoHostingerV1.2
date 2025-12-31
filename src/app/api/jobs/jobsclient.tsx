const params = useSearchParams();

const updateURL = (updates: Partial<Filters>) => {
  const newParams = new URLSearchParams(
    params ? params.toString() : ''
  );

  Object.entries(updates).forEach(([key, value]) => {
    if (!value || value === 'all') {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
  });

  router.push(`/jobs?${newParams.toString()}`);
};
