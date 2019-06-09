import React from "react";
import { Container, Content } from "native-base";

export const withNativeBaseContainer = WrappedComponent => props => (
  <Container>
    <Content padder>
      <WrappedComponent {...props} />
    </Content>
  </Container>
);
