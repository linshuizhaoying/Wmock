const Document = require("../models/document");

export const AllDocument = async () => {
  return await Document.find();
};
export const FindDocumentById = async (documentId: string) => {
  return await Document.findOne({ _id: documentId });
};

export const AddDocument = async (originDocument: DocumentData) => {
  const newDocument = new Document(originDocument);
  let result;
  await newDocument
    .save(async (error: Error) => {
      if (error) {
        result = error.toString();
      }
    })
    .then(async (document: DocumentData) => {
      result = document._id;
    });
  return result;
};

export const UpdateDocument = async (document: DocumentData) => {
  return await Document.update(
    {
      _id: document._id
    },
    {
      $set: {
        content: document.content,
        desc: document.desc,
        name: document.name,
        ownerId: document.ownerId,
        ownerName: document.ownerName,
        assign: document.assign,
        type: document.type
      }
    }
  );
};

export const RemoveDocument = async (id: string) => {
  return Document.remove({
    _id: id
  });
};
