import WithAuth from "~/hoc/withAuth";

const Bistro = () => {
  return (
    <div>
      Bistro Page
      <div> show list of bistros after login</div>
    </div>
  );
};

export default WithAuth(Bistro);
