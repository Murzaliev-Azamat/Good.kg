import React, { useEffect, useState } from 'react';
import {
  Button,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
  TextField,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CompanyApi, PromotionApi } from '../../../../types';
import { selectAddCategoryLoading, selectCategories } from '../../../store/categoriesSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import FileInput from '../FileInput/FileInput';
import { addCompany, fetchCompanies } from '../../../store/companiesThunks';
import { clearAllCompanies, selectCompanies } from '../../../store/companiesSlice';
import { addPromotion, fetchPromotions } from '../../../store/promotionsThunks';
import { clearAllPromotions } from '../../../store/promotionsSlice';

const FormForPromotion = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const categories = useAppSelector(selectCategories);
  const companies = useAppSelector(selectCompanies);
  const addCategoryLoading = useAppSelector(selectAddCategoryLoading);

  const [state, setState] = useState<PromotionApi>({
    title: '',
    description: '',
    company: '',
    image: null,
    isAlways: '',
    isBirthday: false,
    startDate: undefined,
    endDate: undefined,
  });

  console.log(state.startDate);
  console.log(state.endDate);

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(
      addPromotion({
        title: state.title,
        description: state.description,
        company: state.company,
        image: state.image,
        isAlways: state.isAlways,
        isBirthday: state.isBirthday,
        startDate: state.startDate,
        endDate: state.endDate,
      }),
    );
    setState({
      title: '',
      description: '',
      company: '',
      image: null,
      isAlways: '',
      isBirthday: false,
      startDate: undefined,
      endDate: undefined,
    });
    await dispatch(clearAllPromotions());
    await dispatch(fetchPromotions());
    navigate('/admin/admin-promotion');
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

  const switchBirthday = () => {
    setState({ ...state, isBirthday: !state.isBirthday });
  };

  // const handleDateTimeChange = (dateTime: Date | null) => {
  //   setSelectedDateTime(dateTime);
  // };

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

        <InputLabel id="description">Описание</InputLabel>
        <TextField
          sx={{ width: '100%' }}
          id="description"
          value={state.description}
          onChange={inputChangeHandler}
          name="description"
          required
        />
      </Grid>

      <Grid container direction="column" spacing={2} sx={{ mb: 1 }}>
        <Grid item xs>
          <InputLabel id="company">Кампания</InputLabel>
          <Select
            labelId="company"
            sx={{ width: '100%' }}
            id="company"
            value={state.company}
            onChange={selectChangeHandler}
            name="company"
            required
          >
            {companies &&
              companies.map((company) => (
                <MenuItem value={company._id} key={company._id}>
                  {company.title}
                </MenuItem>
              ))}
          </Select>
        </Grid>

        <Grid item xs>
          <InputLabel id="isAlways">Статус</InputLabel>
          <Select
            labelId="isAlways"
            sx={{ width: '100%' }}
            id="isAlways"
            value={state.isAlways.toString()}
            onChange={selectChangeHandler}
            name="isAlways"
            required
          >
            <MenuItem value={true.toString()}>Постоянная акция</MenuItem>
            <MenuItem value={false.toString()}>Временная акция</MenuItem>
          </Select>

          <InputLabel sx={{ mt: 2 }} id="startDate">
            Начало акции
          </InputLabel>
          <TextField
            type={'datetime-local'}
            sx={{ width: '100%' }}
            id="startDate"
            value={state.startDate}
            onChange={inputChangeHandler}
            name="startDate"
          />

          <InputLabel sx={{ mt: 2 }} id="endDate">
            Конец акции
          </InputLabel>
          <TextField
            type={'datetime-local'}
            sx={{ width: '100%' }}
            id="endDate"
            value={state.endDate}
            onChange={inputChangeHandler}
            name="endDate"
          />

          <FormControlLabel
            sx={{ mt: 2 }}
            control={<Switch onChange={switchBirthday} value={state.isBirthday} checked={state.isBirthday} />}
            label="Действует ли в Деньрождение?"
          />
        </Grid>

        <Grid item xs>
          <FileInput onChange={fileInputChangeHandler} name="image" label="Image" />
        </Grid>
      </Grid>

      <Button disabled={disabled} type="submit" color="primary" variant="contained">
        Add promotion
      </Button>
    </form>
  );
};

export default FormForPromotion;
