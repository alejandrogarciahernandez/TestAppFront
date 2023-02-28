import './App.css';
import CustomCard from './components/catalog-card-group/catalog-card-group';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useState, useEffect  } from 'react';
import Col from 'react-bootstrap/Col';
import CustomCardGroup from './components/catalog-card-group/catalog-card-group';
import filterArrayBasedOnString from './utils/filteringHelper';
import mockDataCards from './utils/mockData';
import EditModal from './components/edit-item-modal/edit-modal';
import AddModal from './components/add-item-modal/add-modal';
import AddButton from './components/add-button/add-button';

function App() {


  const [searchBar, setSearchBar] = useState("");
  const [filteredData, setFilteredData] = useState(mockDataCards);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [selectedEditCard, setSelectedEditCard] = useState();
  const [originalData, setOriginalData] = useState();

  useEffect(() => {
    reloadItems();
  }, []);

  const formStyle = {
    backgroundColor : "black",
    padding: "10px",
    borderRadius: "10px"
  };

  const header = {
    height: "100px"
  };

  const spaceSearchBar = {
    height: "40px"
  }

  const onEditCard = (cardToEdit) => {  
    console.log(cardToEdit);
    setSelectedEditCard(cardToEdit);
    setEditModalVisible(true);
  };

  const handleChangeSearchBar = (event) => {
    //const filtarr = filterArrayBasedOnString(searchBar, filteredData);
    setSearchBar(event.target.value);
    setTimeout(() => setFilteredData(filterArrayBasedOnString(event.target.value, originalData)), 500);
  }

  const onClose = () => {
    setEditModalVisible(false);
  }

  const onCloseAdd = () => {
    setAddModalVisible(false);
  }

  const showAddModal = () => {
    setAddModalVisible(true);
  }

  const reloadItems = () => {
    fetch(process.env.REACT_APP_BACKEND_HOST + '/items')
      .then(response => response.json())
      .then(data => {
        setFilteredData(data);
        setOriginalData(data) }
        )
      .catch(error => console.error(error));
  }

  return (
    <Container>
      <AddModal show={addModalVisible} onClose={onCloseAdd} selectedEditCard={selectedEditCard} reloadItems={reloadItems}/>
      <EditModal show={editModalVisible} onClose={onClose} selectedEditCard={selectedEditCard} reloadItems={reloadItems}/>
      <Row style={header}>
        <Col></Col>
      </Row>
      <Row>
        <Col>
          <form style={formStyle}>
            <input type="text" value={searchBar} onChange={handleChangeSearchBar} />
          </form>
        </Col>
      </Row>
      <Row style={spaceSearchBar}>
        <Col></Col>
      </Row>
      <CustomCardGroup onEdit={onEditCard} data={filteredData} />
      <AddButton showAddModal={showAddModal} />
    </Container>
    
  );
}

export default App;
