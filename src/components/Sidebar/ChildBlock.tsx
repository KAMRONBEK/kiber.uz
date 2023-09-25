import { Collapse } from "@mui/material";
// import { Collapse } from "react-collapse"
import { NavLink } from "react-router-dom";

//@ts-ignore
const ChildBlock = ({ element, isVisible }) => {
  return (
    <Collapse
      in={isVisible}
      timeout={{
        enter: 300,
        exit: 200,
      }}
    >
      <div className="child-block">
        {/*@ts-ignore */}
        {element.children.map((childElement) => (
          <NavLink
            key={childElement.id}
            to={childElement.path}
            className="nav-element"
          >
            {childElement.icon && <childElement.icon className="icon" />}
            <div className="label"> {childElement.title}</div>
          </NavLink>
        ))}
      </div>
    </Collapse>
  );
};

export default ChildBlock;
