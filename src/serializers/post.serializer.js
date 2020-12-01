const postSerializer = (object) => ({
  id: object.id,
  title: object.title,
  description: object.description,
  body: object.body,
  createdAt: object.createdAt,
  updatedAt: object.updatedAt,
});

const postCollectionSerializer = (objects) => objects.map((object) => postSerializer(object));

module.exports = {
  postSerializer,
  postCollectionSerializer,
};
