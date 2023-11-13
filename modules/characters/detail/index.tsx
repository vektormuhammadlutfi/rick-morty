'use client'

import { useGetDetailCharacter } from '@/hooks/characters'
import { locationNameState, locationsState } from '@/recoil/location'
import { TLocations } from '@/types/locations'
import { type } from 'os'
import React, { useState, useEffect } from 'react'
import { ReactElement } from 'react'
import { Container, Row, Col, Card, Modal, Form, Button } from 'react-bootstrap'
import Image from 'next/image'
import { useRecoilState } from 'recoil'

type Props = {
  params: { id: string }
}

const DetailCharacterModule = ({ params }: Props) => {
  const { data } = useGetDetailCharacter(params.id)

  const [showModal, setShowModal] = useState(false)

  const [location, setLocation] = useState('')
  const [getRecoilLocations, setRecoilLocations] =
    useRecoilState(locationsState)

  const [getNameLocations, setNameLocations] = useRecoilState(locationNameState)

  console.log(getRecoilLocations)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const locations = localStorage.getItem('locations')
    const nameLocations = localStorage.getItem('locationName')
    if (locations && nameLocations) {
      setRecoilLocations(JSON.parse(locations))
      setNameLocations(JSON.parse(nameLocations))
    }
  }, [setNameLocations, setRecoilLocations])

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value)
  }

  const handleModalClose = () => {
    setShowModal(false)
  }

  const handleModalSave = () => {
    const newLocation = {
      id: Number(params.id),
      name: data?.name,
      status: data?.status,
      species: data?.species,
      type: data?.type,
      gender: data?.gender,
      image: data?.image,
      location: location,
    }

    // setRecoilLocations({ data: [newLocation] })
    setRecoilLocations((oldLocations) => {
      // check if the location already exists with the same character

      const locationExists = oldLocations.data.find((item) => {
        return item.location === location && item.id === Number(params.id)
      })

      if (locationExists) {
        alert('This location already exists for this character')
        return oldLocations
      }

      localStorage.setItem(
        'locations',
        JSON.stringify({ data: [...oldLocations.data, newLocation] })
      )
      return {
        data: [...oldLocations.data, newLocation],
      }
    })

    // check if there is a location with the same name
    const nameExists = getNameLocations.find((item) => {
      return item === location
    })

    if (nameExists) return getNameLocations

    setNameLocations((oldNameLocations) => {
      localStorage.setItem(
        'locationName',
        JSON.stringify([...oldNameLocations, location])
      )
      return [...oldNameLocations, location]
    })

    handleModalClose()
  }

  return (
    <Container>
      <Row>
        <Col>
          <h1 className='mt-3 mb-4'>Character Details</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Image
                  src={data?.image as string}
                  width='0'
                  height='0'
                  alt={data?.name as string}
                  layout="responsive"
                />
            <Card.Body>
              <Card.Title>{data?.name}</Card.Title>
              <Card.Text>
                <p>Status: {data?.status}</p>
                <p>Species: {data?.species}</p>
                <p>Type: {data?.type}</p>
                <p>Gender: {data?.gender}</p>
              </Card.Text>
              <Button
                variant='primary'
                onClick={() => setShowModal(true)}
              >
                Add Location
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Modal
        show={showModal}
        onHide={handleModalClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Location</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Location</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter new location'
              value={location}
              onChange={handleLocationChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='secondary'
            onClick={handleModalClose}
          >
            Close
          </Button>
          <Button
            variant='primary'
            onClick={handleModalSave}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default DetailCharacterModule
