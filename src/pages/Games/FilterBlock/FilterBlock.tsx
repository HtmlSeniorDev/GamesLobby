import { observer } from 'mobx-react';
import React from 'react';
import { Button, Col, FormControl, FormSelect, InputGroup, Row } from 'react-bootstrap';
import s from '@src/pages/Games/Games.css';
import { useRootStore } from '@src/stores/StoreContext';

const FilterBlock = () => {
  const { gamesViewModel } = useRootStore();

  const listTags = gamesViewModel.filteredTags.map(tag => (
    <Button className={s.tag} key={tag.id} value={tag.name}>
      {tag.name}
    </Button>
  ));

  const listSections = gamesViewModel.root.gamesStore.gamesSections.map(section => (
    <option key={section.id} value={section.name}>
      {section.name}
    </option>
  ));

  return (
    <>
      <Row>
        <Col sm={4}>
          <FormSelect onChange={e => gamesViewModel.changeSectionFilter(e.target.value)} aria-label="Games section">
            <option value={'All'}>All</option>
            {listSections}
          </FormSelect>
        </Col>
        <Col sm={4}>
          <InputGroup className="mb-3">
            <FormControl
              onChange={e => gamesViewModel.changeSearchFilter(e.target.value)}
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              placeholder={'Search'}
            />
          </InputGroup>
        </Col>
      </Row>
      <Row xs="auto">
        <Col>
          <Button href="#">All</Button>
          {listTags}
        </Col>
      </Row>
      <hr className={s.line} />
    </>
  );
};

export default observer(FilterBlock);
