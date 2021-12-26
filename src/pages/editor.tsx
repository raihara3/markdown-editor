// lib
import React, { useState } from "react"
import styled from "styled-components"
import ReactMarkdown from "react-markdown"
import { Link } from 'react-router-dom'

// components
import Header from "../components/header"
import Button from "../components/button"
import SaveModal from "../components/saveModal"

// utils
import { putMemo } from "../indexeddb/memos"

const Wrapper = styled.header`
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 3rem;
`

const HeaderArea = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  left: 0;
`

const TextArea = styled.textarea`
  border-right: 1px solid silver;
  border-top: 1px solid silver;
  bottom: 0;
  font-size: 1rem;
  left: 0;
  padding: 0.5rem;
  position: absolute;
  top: 0;
  width: 50vw;
`

const Preview = styled.div`
  border-top: 1px solid silver;
  bottom: 0;
  overflow-y: scroll;
  padding: 1rem;
  position: absolute;
  right: 0;
  top: 0;
  width: 50vw;
`

interface Props {
 text: string
 setText: (text: string) => void
}

const Editor: React.FC<Props> = ({
  text,
  setText
}) => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false)

  return (
    <>
      <HeaderArea>
        <Header title="Markdown Editor">
          <Button onClick={() => setIsShowModal(true)}>
            保存する
          </Button>
          <Link to="/history">
            履歴を見る
          </Link>
        </Header>
      </HeaderArea>
      <Wrapper>
        <TextArea
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <Preview>
          <ReactMarkdown>{text}</ReactMarkdown>
        </Preview>
      </Wrapper>
      {isShowModal && (
        <SaveModal
          onSave={(title: string):void => {
            putMemo(title, text)
            setIsShowModal(false)
          }}
          onCancel={() => {
            setIsShowModal(false)
          }}
        ></SaveModal>
      )}
    </>
  )
}

export default Editor
