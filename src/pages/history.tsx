// lib
import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'

// components
import Header from '../components/header'

// utils
import { getMemos, getMemoPageCount, MemoRecord } from "../indexeddb/memos"

const HeaderArea = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  left: 0;
`

const Wrapper = styled.div`
  bottom: 3rem;
  left: 0;
  position: fixed;
  right: 0;
  top: 3rem;
  padding: 0 1rem;
  overflow-y: scroll;
`

const Memo = styled.button`
  display: block;
  background-color: white;
  border: 1px solid gray;
  width: 100%;
  padding: 1rem;
  margin: 1rem 0;
  text-align: left;
`

const MemoTitle = styled.div`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`

const MemoText = styled.div`
  font-size: 0.85rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const Paging = styled.div`
  bottom: 0;
  height: 3rem;
  left: 0;
  line-height: 2rem;
  padding: 0.5rem;
  position: fixed;
  right: 0;
  text-align: center;
`

const PagingButton = styled.button`
  background: none;
  border: none;
  display: inline-block;
  height: 2rem;
  padding: 0.5rem 1rem;

  &:disabled {
    color: silver;
  }
`

interface Props {
  setText: (text: string) => void
}

const History: React.FC<Props> = ({
  setText
}) => {
  const [memos, setMemos] = useState<MemoRecord[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [maxPage, setMaxPage] = useState<number>(1)
  const history = useHistory()

  useEffect(() => {
    getMemos(1).then(m => setMemos(m))
    getMemoPageCount().then(c => setMaxPage(c))
  }, [])

  const hasNextPage:boolean = currentPage < maxPage
  const hasPrevPage: boolean = currentPage > 1
  const movePage = (targetPage: number) => {
    if(targetPage < 1 || maxPage < targetPage) return
    setCurrentPage(targetPage)
    getMemos(targetPage).then(m => setMemos(m))
  }

  return (
    <>
      <HeaderArea>
        <Header title="履歴">
          <Link to="/editor">
            エディタに戻る
          </Link>
        </Header>
      </HeaderArea>
      <Wrapper>
        {memos.map(memo => {
          return (
            <Memo
              key={memo.datetime}
              onClick={() => {
                setText(memo.text)
                history.push("/editor")
              }}
            >
              <MemoTitle>{memo.title}</MemoTitle>
              <MemoText>{memo.text}</MemoText>
            </Memo>
          )
        })}
      </Wrapper>
      <Paging>
        <PagingButton
          onClick={() => movePage(currentPage - 1)}
          disabled={!hasPrevPage}
        >
          ＜
        </PagingButton>
        {currentPage} / {maxPage}
        <PagingButton
          onClick={() => movePage(currentPage + 1)}
          disabled={!hasNextPage}
        >
          ＞
        </PagingButton>
      </Paging>
    </>
  )
}

export default History
