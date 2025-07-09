import styles from "./AuthorDetails.module.scss";

const fakeAuthor = {
  photos: [5543033, -1],
  bio: 'Joanne "Jo" Murray, OBE (n\u00e9e Rowling), better known under the pen name J. K. Rowling, is a British author best known as the creator of the Harry Potter fantasy series, the idea for which was conceived whilst on a train trip from Manchester to London in 1990. The Potter books have gained worldwide attention, won multiple awards, sold more than 400 million copies, and been the basis for a popular series of films.',
  name: "J. K. Rowling",
  entity_type: "person",
  birth_date: "31 July 1965",
  fuller_name: 'Joanne "Jo" Rowling',
  title: "OBE",
  type: { key: "/type/author" },
  personal_name: "J. K. Rowling",
  latest_revision: 123,
  revision: 123,
  created: { type: "/type/datetime", value: "2008-04-01T03:28:50.625462" },
  last_modified: {
    type: "/type/datetime",
    value: "2025-06-21T18:08:44.104415",
  },
};

function AuthorDetails({ author }) {
  // TODO change fakeAuthor by author
  return (
    <section className={styles.authorDetails}>
      <h3>{fakeAuthor?.name}</h3>
      <p>{fakeAuthor?.bio}</p>
      <h3>Books</h3>
      <h3>Read books</h3>
    </section>
  );
}

export default AuthorDetails;
