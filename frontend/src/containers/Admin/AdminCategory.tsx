import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCategories } from '../../store/categoriesSlice';
import { NavLink } from 'react-router-dom';
import { deleteCategory, fetchCategories } from '../../store/categoriesThunks';

const AdminCategory = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);

  const removeCategory = async (id: string) => {
    await dispatch(deleteCategory(id));
    await dispatch(fetchCategories());
  };

  return (
    <div>
      <h2>Category</h2>
      <NavLink to={'/add-category'} type="button" className="btn btn-primary btn-sm">
        Добавить категорию
      </NavLink>
      <div style={{ display: 'flex', marginTop: '20px' }}>
        <h3 style={{ marginRight: '261px', fontSize: '20px' }}>Название категории</h3>
        <h3 style={{ fontSize: '20px' }}>Родительская категория</h3>
      </div>
      {categories &&
        categories.map((category) => {
          const parentTitle = category.parent ? category.parent.title : '-';
          return (
            <div
              key={category._id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '5px',
                marginTop: '5px',
              }}
            >
              <div style={{ width: '200px' }}>
                <p style={{ margin: '0' }}>{category.title}</p>
              </div>
              <div style={{ width: '300px' }}>
                <p style={{ margin: '0' }}>{parentTitle}</p>
              </div>
              <button onClick={() => removeCategory(category._id)} className="btn btn-danger btn-sm">
                delete
              </button>
            </div>
          );
        })}
    </div>
  );
};

export default AdminCategory;
