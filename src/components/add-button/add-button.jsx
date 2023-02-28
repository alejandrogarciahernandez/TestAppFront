import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './AddButton.css';

function AddButton({ showAddModal }) {

  return (
    <Button variant="primary" onClick={showAddModal} className="position-fixed mb-5 mr-5 rounded-circle add-button" style={{ right: '50px', bottom: '0', width: '60px', height: '60px', backgroundColor: 'black', borderColor: 'black' }}>
      <FontAwesomeIcon icon={faPlus} />
    </Button>
  );
}

export default AddButton;