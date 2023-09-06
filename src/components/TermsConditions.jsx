import React, { useState, useEffect } from "react";
import { Accordion, Icon } from "semantic-ui-react";
import { Checkbox, Form } from "semantic-ui-react";

const TermsConditions = ({ onAcceptCondition, submitted }) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen((o) => !o);
  };

  useEffect(() => {
    if (!!submitted) {
      setOpen(false);
    }
  }, [submitted]);

  return (
    <>
      <Accordion>
        <Accordion.Title active={open} onClick={handleClick}>
          <Icon name="dropdown" />
          Accept the terms & Conditions below
        </Accordion.Title>
        <Accordion.Content active={open}>
          <div>
            By using our services, you acknowledge and consent to the
            collection, processing, and storage of your data within the secure
            confines of Humber College's data center. We are committed to
            safeguarding your personal information and ensuring its
            confidentiality. Rest assured that your data will not be shared,
            disclosed, or transmitted outside the institution, preserving your
            privacy and maintaining the integrity of your information within the
            Humber College ecosystem. Your trust is paramount to us, and we
            adhere to stringent data protection measures to uphold your privacy
            rights. If you have any questions or concerns about the handling of
            your data, please do not hesitate to reach out to our dedicated
            privacy team. By continuing to use our services, you signify your
            understanding of this consent and your agreement to the specified
            data storage and usage practices outlined above.
            <hr />
            <Form.Field>
              <Checkbox
                onChange={() => onAcceptCondition(true)}
                label="I agree to the Terms and Conditions"
              />
            </Form.Field>
          </div>
        </Accordion.Content>
      </Accordion>
    </>
  );
};

export default TermsConditions;
