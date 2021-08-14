import React, { useState } from "react";
import debounce from 'lodash/debounce';
import { addSet } from 'modules/sets/setsSlice.js';
import { useDispatch } from "react-redux";
import { useLocation, Redirect } from 'react-router-dom';

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";


const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  titleContainer: {
    position: "relative",
    width: "100%",
    background: "white",
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(8),
  },
  listTerm: {
    position: "relative",
    width: "100%",
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
  },
  listTermContainer: {
    position: "relative",
  },
  term: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(2),
  },
  addCardButton: {
    width: "100%",
    padding: theme.spacing(3),
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(15),
  },
  createButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    padding: theme.spacing(3),
  },
}));

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SetsAddedForm() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [isRedirect, setIsRedirect] = useState(false)
  const [title, setTitle] = useState('')
  const [words, setWords] = useState([])
  const [numberOfTerm, setNumberOfTerm] = useState(4);
  const handleTitleChange = debounce((e) => setTitle(e.target.value),250)
  const handleWordChange = debounce((e,index,key) => {
    setWords((prev) => {
      let newWords = [...prev]
      newWords[index] = {...(newWords[index] || {}), [key]: e.target.value}
      return newWords
    })
  },250)
  const handleSubmit = () => {}

  let query = useQuery()
  let folderId = query.get('folderId')

  let listWords = [];
  for (let i = 0; i <= numberOfTerm; i++) {
    listWords.push(
      <Paper elevation={0} className={classes.term}>
        <Grid container spacing={3} alignItems="flex-end">
          <Grid item xs={12} sm={6}>
            <Typography variant="subtle" gutterBottom>
              {i+1}
            </Typography>
            <Input
              required
              id={`term${i}`}
              name={`term${i}`}
              label="Term"
              fullWidth
              onChange={(e) => handleWordChange(e,i,'term')}
            />
            <Typography variant="subtle" gutterBottom>
              Term
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              required
              id={`definition${i}`}
              name={`definition${i}`}
              label="Definition"
              fullWidth
              onChange={(e) => handleWordChange(e,i,'meaning')}
            />
            <Typography variant="subtle" gutterBottom>
              Description
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    );
  }
  if (isRedirect) {
    return <Redirect to='/' />
  }
  return (
    <div className={classes.root}>
      <div className={classes.titleContainer}>
        <Container maxWidth="md">
          <Typography variant="h6" gutterBottom>
            Create set
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Input
                required
                id="title"
                name="title"
                label="Title"
                fullWidth
                placeholder="Enter a title"
                onChange={handleTitleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input
                required
                id="description"
                name="description"
                label="Description"
                fullWidth
                placeholder="Add a description"
              />
            </Grid>
          </Grid>
        </Container>
      </div>
      <div className={classes.listTerm}>
        <Container
          maxWidth="md"
          disableGutters
          className={classes.listTermContainer}
        >
          {listWords}
          <Button
            variant="contained"
            color="primary"
            className={classes.addCardButton}
            onClick={() => setNumberOfTerm(prev => prev + 1)}
          >
              Add Card
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.createButton}
            onClick={() => {
              dispatch(addSet({
                name: title,
                folder: folderId,
                words: words,
              }))
              setTitle('')
              setWords([])
              setIsRedirect(true)
            }}
          >
              Create
          </Button>
        </Container>
      </div>
    </div>
  );
}
