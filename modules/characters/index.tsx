'use client'

import { useGetCharacters } from '@/hooks/characters'
import { characterPageState, charactersState } from '@/recoil/character'
import React, { useEffect, useState } from 'react'
import { ReactElement } from 'react'
import { useRecoilState } from 'recoil'
import { Container, Row, Col, Card, Pagination } from 'react-bootstrap'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
// import Card from './Card'

const CharacterModule = (): ReactElement => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const page = Number(searchParams.get('page')) || 1

  const { data } = useGetCharacters(page)
  const [currentPage, setCurrentPage] = useState(1)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    router.replace(`/?page=${pageNumber}`)
  }

  const renderPageNumbers = () => {
    if (!data) return null

    const pagesToShow = 5 // Number of page numbers to show around the current page
    const pageNumbers = []

    const minPage = Math.max(currentPage - Math.floor(pagesToShow / 2), 1)
    const maxPage = Math.min(minPage + pagesToShow - 1, data?.info?.pages)

    if (minPage > 1) {
      pageNumbers.push(
        <Pagination.Item
          key={1}
          onClick={() => handlePageChange(1)}
        >
          1
        </Pagination.Item>
      )
      if (minPage > 2) {
        pageNumbers.push(
          <Pagination.Ellipsis
            key='ellipsis-start'
            disabled
          />
        )
      }
    }

    for (let i = minPage; i <= maxPage; i++) {
      pageNumbers.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Pagination.Item>
      )
    }

    if (maxPage < data?.info?.count) {
      if (maxPage < data?.info?.count - 1) {
        pageNumbers.push(
          <Pagination.Ellipsis
            key='ellipsis-end'
            disabled
          />
        )
      }
      pageNumbers.push(
        <Pagination.Item
          key={data?.info?.count}
          onClick={() => handlePageChange(data?.info?.count)}
        >
          {data?.info?.count}
        </Pagination.Item>
      )
    }

    return pageNumbers
  }

  return (
    <Container>
      <h1 className='mt-5 text-center'>Character Cards</h1>
      <Row className='mt-4'>
        {data?.results?.map((character) => (
          <Col
            key={character.id}
            md={4}
          >
            <Link
              href={`character/${character.id}`}
              style={{
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <Card className='mb-3'>
                <Image
                  src={character.image as string}
                  width='0'
                  height='0'
                  alt={character.name as string}
                  layout="responsive"
                />
                <Card.Body>
                  <Card.Title>{character.name}</Card.Title>
                  <Card.Text>
                    <strong>Status:</strong> {character.status}
                    <br />
                    <strong>Species:</strong> {character.species}
                    <br />
                    <strong>Type:</strong> {character.type}
                    <br />
                    <strong>Gender:</strong> {character.gender}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
      <Pagination>
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {renderPageNumbers()}
        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === data?.info?.count}
        />
      </Pagination>
    </Container>
  )
}

export default CharacterModule
