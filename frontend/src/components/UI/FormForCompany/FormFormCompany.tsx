import React, { useState } from 'react';
import { Button, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CompanyApi } from '../../../../types';
import { selectAddCategoryLoading, selectCategories } from '../../../store/categoriesSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import FileInput from '../FileInput/FileInput';
import { addCompany, fetchCompanies } from '../../../store/companiesThunks';
import { clearAllCompanies } from '../../../store/companiesSlice';

const FormForCompany = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const addCategoryLoading = useAppSelector(selectAddCategoryLoading);

  const [state, setState] = useState<CompanyApi>({
    title: '',
    description: '',
    categories: [],
    image: null,
    link: '',
  });

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(
      addCompany({
        title: state.title,
        description: state.description,
        categories: state.categories,
        image: state.image,
        link: state.link,
      }),
    );
    setState({ title: '', description: '', categories: [], image: null, link: '' });
    await dispatch(clearAllCompanies());
    await dispatch(fetchCompanies());
    navigate('/admin/admin-company');
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const selectChangeHandler = (e: SelectChangeEvent<string[]>) => {
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
        <InputLabel id="title">Название</InputLabel>
        <TextField
          sx={{ width: '100%' }}
          id="title"
          value={state.title}
          onChange={inputChangeHandler}
          name="title"
          required
        />

        <InputLabel id="parent">Описание</InputLabel>
        <TextField
          sx={{ width: '100%' }}
          id="description"
          value={state.description}
          onChange={inputChangeHandler}
          name="description"
        />

        <InputLabel id="parent">Ссылка на сайт</InputLabel>
        <TextField sx={{ width: '100%' }} id="link" value={state.link} onChange={inputChangeHandler} name="link" />
      </Grid>

      <Grid container direction="column" spacing={2} sx={{ mb: 1 }}>
        <Grid item xs>
          <InputLabel id="parent">Категории</InputLabel>
          <Select
            labelId="categories"
            sx={{ width: '100%' }}
            id="categories"
            value={state.categories}
            onChange={selectChangeHandler}
            name="categories"
            multiple
            required
          >
            {categories &&
              categories.map((category) => (
                <MenuItem value={category._id} key={category._id}>
                  {category.title}
                </MenuItem>
              ))}
          </Select>
        </Grid>

        <Grid item xs>
          <FileInput onChange={fileInputChangeHandler} name="image" label="Image" />
        </Grid>
      </Grid>

      <Button disabled={disabled} type="submit" color="primary" variant="contained">
        Add company
      </Button>
    </form>
  );
};

export default FormForCompany;
