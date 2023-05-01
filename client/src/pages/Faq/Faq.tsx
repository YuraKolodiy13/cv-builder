import React, {FC} from 'react';
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import {ReactComponent as ExpandMoreIcon} from "../../assets/icons/chevron-down.svg";
import './Faq.scss';

const data = [
  {
    question: 'Can I save my CV?',
    answer: 'Yes! you can save your CV'
  },
  {
    question: 'Can I update my CV?',
    answer: 'Yes! you can save your CV'
  },
  {
    question: 'Can I download my CV?',
    answer: 'Yes! you can download your cv directly from your dashboard'
  },
  {
    question: 'Can I cancel or delete my account?',
    answer: 'We will be sad to see you go, but yes, of course! you will be able to cancel your subscription or delete your account at any moment'
  },
]

const Faq: FC = () => {

  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className='Faq'>
      <h1>Faq</h1>
      {data.map((item, i) =>
        <Accordion key={i} expanded={expanded === item.question} onChange={handleChange(item.question)}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
          >
            <h4>{item.question}</h4>
          </AccordionSummary>
          <AccordionDetails>
            <p>{item.answer}</p>
          </AccordionDetails>
        </Accordion>
      )}
    </div>
  );
};

export default Faq;