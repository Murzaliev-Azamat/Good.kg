import React, { useState } from 'react';
import { Button, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CategoryApi } from '../../../../types';
import { addCategory, fetchCategories } from '../../../store/categoriesThunks';
import { selectAddCategoryLoading, selectCategories } from '../../../store/categoriesSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';

const FormForCategory = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const addCategoryLoading = useAppSelector(selectAddCategoryLoading);

  const [state, setState] = useState<CategoryApi>({
    title: '',
    parent: '',
  });

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(
      addCategory({
        title: state.title,
        parent: state.parent,
      }),
    );
    setState({ title: '', parent: '' });
    await dispatch(fetchCategories());
    navigate('/admin/admin-category');
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const selectChangeHandler = (e: SelectChangeEvent) => {
    const name = e.target.name;
    const value = e.target.value;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        [name]: null,
      }));
    }
  };

  let disabled = false;

  if (addCategoryLoading) {
    disabled = true;
  }

  return (
    <form
      autoComplete="off"
      onSubmit={submitFormHandler}
      style={{ marginTop: '120px', width: '500px', marginLeft: '50px' }}
    >
      <Grid item container justifyContent="space-between" alignItems="center" xs sx={{ mb: 1 }}>
        <InputLabel id="parent">Название</InputLabel>
        <TextField
          sx={{ width: '100%' }}
          id="title"
          // label="Title"
          value={state.title}
          onChange={inputChangeHandler}
          name="title"
          required
        />
      </Grid>

      <Grid container direction="column" spacing={2} sx={{ mb: 1 }}>
        <Grid item xs>
          <InputLabel id="parent">Родительская категория</InputLabel>
          <Select
            labelId="parent"
            sx={{ width: '100%' }}
            id="parent"
            // label="Parent"
            value={state.parent}
            onChange={selectChangeHandler}
            name="parent"
            // required
          >
            {categories &&
              categories.map((category) => (
                <MenuItem value={category._id} key={category._id}>
                  {category.title}
                </MenuItem>
              ))}
          </Select>
        </Grid>
      </Grid>

      <Button disabled={disabled} type="submit" color="primary" variant="contained">
        Add category
      </Button>
    </form>
  );
};

export default FormForCategory;
