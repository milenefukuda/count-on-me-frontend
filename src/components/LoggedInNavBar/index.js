import { SearchBar } from "../SearchBar";
import { useState, useEffect, useRef } from "react";
import { usePopper } from "react-popper";

export function LoggedInNavBar() {
  const [search, setSearch] = useState("");
  function changeSearch(text) {
    setSearch(text);
  }

  const [showPopover, setShowPopover] = useState(false);

  function togglePopover() {
    setShowPopover(!showPopover);
  }

  const popoverId = "my-popover";
  const secondImageref = useRef(null);
  const popoverContent =
    "<strong>About the Initiative: </strong>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut semper at sapien non facilisis. Etiam mauris est, tempor quis tempus eget, consequat vel mauris. Aliquam convallis finibus enim. Maecenas mattis laoreet massa, id faucibus diam vehicula at. Vestibulum feugiat augue ac mi mattis, vel imperdiet purus finibus. In efficitur arcu id felis elementum, in egestas ipsum viverra. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut semper at sapien non facilisis. Etiam mauris est, tempor quis tempus eget, consequat vel mauris. Aliquam convallis finibus enim. Maecenas mattis laoreet massa, id faucibus diam vehicula at. Vestibulum feugiat augue ac mi mattis, vel imperdiet purus finibus. In efficitur arcu id felis elementum, in egestas ipsum viverra.";

  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "bottom",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 10],
        },
      },
    ],
  });

  useEffect(() => {
    const secondImage = secondImageref.current;

    if (secondImage) {
      setReferenceElement(secondImage);
    }
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/" style={{ color: "black" }}>
            <img
              src="https://res.cloudinary.com/dieqaoy0n/image/upload/v1686141967/Icon_bwb14d.png"
              alt="Logo"
              style={{ width: "25px", height: "auto", marginRight: "10px" }}
            />
            You count on me!
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
              {/* <li className="nav-item" style={{ marginRight: "10px" }}>
                <SearchBar changeSearch={changeSearch} />
              </li> */}

              <li className="nav-item">
                <a href="/user/profile">
                  <img
                    src="https://res.cloudinary.com/dieqaoy0n/image/upload/v1686323510/Group_afenmg.svg"
                    alt="Link"
                    style={{
                      width: "25px",
                      height: "auto",
                      marginRight: "10px",
                    }}
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
