import React, { ReactElement } from "react";
import Container from "../shared/Container";
import Ditem from "./Ditem";

interface Props {}

export default function Details({}: Props): ReactElement {
  return (
    <div className="py-28">
      <Container>
        <h2 className="font-sans text-3xl font-bold text-center">FAQs</h2>

        <div>
          <Ditem />
        </div>
      </Container>
    </div>
  );
}
