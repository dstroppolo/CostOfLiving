import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'

const Explainer = () => (
    <Modal trigger={<Button>How does this work?</Button>}>
      <Modal.Header>How does this work?</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Header>Compare salaries in multiple cities</Header>
          <p>Start by selecting a city on the left. This is considered the baseline city to which others will be compared to.</p>
          <p>Next, select a career from the drop down underneath. You will see the 50th percentile salary for the job in the selected city. </p>
          <p>Now select a city to compare it to on the right. Once selected, you will notice a number appear underneath the career dropdown. 
             This number represents how much you would need to earn in this city to have an equivalent lifestyle to the salary of the leftmost city.</p>

            <h4>Disclaimer:</h4>
            <p>These numbers may not be completely accurate and should not be used for any serious research. All data is taken from <a target='_blank' href="https://developers.teleport.org/api/">teleport.org</a></p>
            <p>This project was developed in React.js by <a href = 'http://stroppolo.ca' target='_blank'>Daniel Stroppolo.</a></p>
          
        </Modal.Description>
      </Modal.Content>
    </Modal>
  )


  export default Explainer