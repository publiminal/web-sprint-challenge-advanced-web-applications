import React, { useEffect, useState } from 'react'
import PT from 'prop-types'

const initialFormValues = { title: '', text: '', topic: '' }

export default function ArticleForm(props) {
  const [values, setValues] = useState(initialFormValues)
  // const [currentArt, setCurrentArt] = useState({article_id:'' , ...values })
  // ✨ where are my props? Destructure them here
  const { postArticle, updateArticle, setCurrentArticleId, currentArticle, currentArticleId, getCurrentArticle } = props
  // const _currentArticle = {article_id:'' , ...initialFormValues }
  // console.log('init currentArticle', currentArt)
  useEffect(() => {
    // ✨ implement
    // Every time the `currentArticle` prop changes, we should check it for truthiness:
    // if it's truthy, we should set its title, text and topic into the corresponding
    // values of the form. If it's not, we should reset the form back to initial values.
    //currentArticle =  
    // setValues(...)
      if(currentArticleId){
        setValues( getCurrentArticle())
      }else{
        setValues(initialFormValues)
      }
  }, [currentArticleId])

  const onChange = evt => {
    const { id, value } = evt.target
    setValues({ ...values, [id]: value })
  }
  
  const isValidPost = (title, text, topic) => {
    return title.trim().length >=1 && text.trim().length >= 1 && topic.trim().length >= 1
  }

  const onSubmit = evt => {
    evt.preventDefault()
    // ✨ implement
    // We must submit a new post or update an existing one,
    // depending on the truthyness of the `currentArticle` prop.
    const {article_id, title, text, topic} = values
    if (!isValidPost(title, text, topic)) {return}
    if(currentArticleId ){
      //edit article  API call
      updateArticle( {article_id, article:{title, text, topic}} )
    }else{
      // create article API call
      // console.log('start create article')
      // console.log('onSubmit will call createArticle ?', {title, text, topic})
      postArticle({title, text, topic})
      setValues(initialFormValues)
    }
  }


  const isDisabled = () => {
    // ✨ implement
    // Make sure the inputs have some values
    return !values.title  || !values.text  || !values.topic
  }

  const handleCancel = () => {
    setValues(initialFormValues)
    setCurrentArticleId(undefined)
  }

  return (
    // ✨ fix the JSX: make the heading display either "Edit" or "Create"
    // and replace Function.prototype with the correct function
    <form id="form" onSubmit={onSubmit}>
      <h2>{currentArticleId ? 'Edit' : 'Create'} Article</h2>
      <input
        maxLength={50}
        onChange={onChange}
        value={values.title}
        placeholder="Enter title"
        id="title"
      />
      <textarea
        maxLength={200}
        onChange={onChange}
        value={values.text}
        placeholder="Enter text"
        id="text"
      />
      <select onChange={onChange} id="topic" value={values.topic}>
        <option value="">-- Select topic --</option>
        <option value="JavaScript">JavaScript</option>
        <option value="React">React</option>
        <option value="Node">Node</option>
      </select>
      <div className="button-group">
        <button disabled={isDisabled()} id="submitArticle">Submit</button>
        <button onClick={handleCancel}>Cancel edit</button>
      </div>
    </form>
  )
}

// 🔥 No touchy: LoginForm expects the following props exactly:
ArticleForm.propTypes = {
  postArticle: PT.func.isRequired,
  updateArticle: PT.func.isRequired,
  setCurrentArticleId: PT.func.isRequired,
  currentArticle: PT.shape({ // can be null or undefined, meaning "create" mode (as opposed to "update")
    article_id: PT.number.isRequired,
    title: PT.string.isRequired,
    text: PT.string.isRequired,
    topic: PT.string.isRequired,
  })
}
