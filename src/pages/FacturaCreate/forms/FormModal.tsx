type propsType = {
  data: any;
  setOpenModal?: any;
  setOnchangeItem?: any;
};

const FormModal = (props: propsType) => {
  const activeItem = props.data.length > 0 ? true : false;
  return (
    <div
      className="top-modal"
      style={{
        height: activeItem ? "150px" : "50px",
        top: activeItem ? "-155px" : "-55px",
      }}
    >
      {props?.data?.map((item: any) => {
        return (
          <div
            key={item.id}
            onClick={() => {
              props.setOpenModal(false);
              props.setOnchangeItem(item);
            }}
            style={{
              display: "flex",
              justifyContent: "flex-start",
              marginBottom: "15px",
            }}
          >
            <p style={{ color: "black", fontSize: "13px" }}>{item.id}.</p>
            <p
              style={{
                color: "blacl",
                fontSize: "13px",
                cursor: "pointer",
              }}
            >
              {item?.data?.label}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default FormModal;
