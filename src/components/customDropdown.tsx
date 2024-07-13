import { useState } from "react";
import Collapse from "@mui/material/Collapse";
import React from "react";

function CustomDropdown(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [type, setType] = useState("Type");

    function showDropdown() {
        setIsOpen(true);
    }

    function handleSelect(e) {
        const value = e.target.innerHTML.toLowerCase();
        const output = {
            target: {
                value: value,
                name: "type",
            },
        };

        setType(e.target.innerHTML);
        setIsOpen(false);
        props.handleChange(output);
    }

    return (
        <div>
            <div className={isOpen ? "isOpen dropdown" : "dropdown"} onClick={showDropdown}>
                {type}
            </div>
            <Collapse in={isOpen} className="item">
                <div onClick={handleSelect} className="dropdown option">
                    Income
                </div>
                <div onClick={handleSelect} className="dropdown option">
                    Expence
                </div>
            </Collapse>
        </div>
    );
}

export default CustomDropdown;
