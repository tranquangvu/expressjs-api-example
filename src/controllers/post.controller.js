exports.list = (req, res, next) => {
  const posts = [
    {
      title: 'title1',
      description: 'description1',
    },
  ];
  res.json(posts);
};
