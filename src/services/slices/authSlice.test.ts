import authReducer, {
  getUser,
  login,
  logout,
  register,
  setAuthChecked,
  updateUser
} from './authSlice';

jest.mock('../../utils/cookie', () => ({
  setCookie: jest.fn(),
  deleteCookie: jest.fn()
}));

describe('authSlice reducer', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('handles setAuthChecked action', () => {
    const state = authReducer(undefined, setAuthChecked(true));

    expect(state.isAuthChecked).toBe(true);
  });

  it('handles getUser pending action', () => {
    const state = authReducer(undefined, getUser.pending('', undefined));

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('handles getUser success action', () => {
    const userMock = { email: 'test@example.com', name: 'Test User' };

    const state = authReducer(
      { user: null, isAuthChecked: false, loading: true, error: null },
      getUser.fulfilled(userMock, '', undefined)
    );

    expect(state.loading).toBe(false);
    expect(state.user).toEqual(userMock);
    expect(state.isAuthChecked).toBe(true);
  });

  it('handles getUser failed action', () => {
    const error = new Error('Get user failed');

    const state = authReducer(
      { user: null, isAuthChecked: false, loading: true, error: null },
      getUser.rejected(error, '', undefined)
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBe('Get user failed');
    expect(state.isAuthChecked).toBe(true);
  });

  it('handles login success action', () => {
    const userMock = { email: 'test@example.com', name: 'Test User' };

    const state = authReducer(
      { user: null, isAuthChecked: false, loading: true, error: null },
      login.fulfilled(userMock, '', { email: 'test@example.com', password: 'password' })
    );

    expect(state.loading).toBe(false);
    expect(state.user).toEqual(userMock);
    expect(state.isAuthChecked).toBe(true);
  });

  it('handles login pending action', () => {
    const state = authReducer(undefined, login.pending('', { email: '', password: '' }));

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('handles login failed action', () => {
    const error = new Error('Login failed');

    const state = authReducer(
      { user: null, isAuthChecked: false, loading: true, error: null },
      login.rejected(error, '', { email: '', password: '' })
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBe('Login failed');
    expect(state.isAuthChecked).toBe(true);
  });

  it('handles register pending action', () => {
    const state = authReducer(
      undefined,
      register.pending('', { email: '', password: '', name: '' })
    );

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('handles register success action', () => {
    const userMock = { email: 'test@example.com', name: 'Test User' };

    const state = authReducer(
      { user: null, isAuthChecked: false, loading: true, error: null },
      register.fulfilled(userMock, '', {
        email: 'test@example.com',
        password: 'password',
        name: 'Test User'
      })
    );

    expect(state.loading).toBe(false);
    expect(state.user).toEqual(userMock);
    expect(state.isAuthChecked).toBe(true);
  });

  it('handles register failed action', () => {
    const error = new Error('Registration failed');

    const state = authReducer(
      { user: null, isAuthChecked: false, loading: true, error: null },
      register.rejected(error, '', { email: '', password: '', name: '' })
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBe('Registration failed');
    expect(state.isAuthChecked).toBe(true);
  });

  it('handles updateUser pending action', () => {
    const state = authReducer(undefined, updateUser.pending('', { name: 'New Name' }));

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('handles updateUser success action', () => {
    const userMock = { email: 'test@example.com', name: 'Updated User' };

    const state = authReducer(
      {
        user: { email: 'test@example.com', name: 'Old User' },
        isAuthChecked: true,
        loading: true,
        error: null
      },
      updateUser.fulfilled(userMock, '', { name: 'Updated User' })
    );

    expect(state.loading).toBe(false);
    expect(state.user).toEqual(userMock);
  });

  it('handles updateUser failed action', () => {
    const error = new Error('Update user failed');

    const state = authReducer(
      {
        user: { email: 'test@example.com', name: 'Old User' },
        isAuthChecked: true,
        loading: true,
        error: null
      },
      updateUser.rejected(error, '', { name: 'Updated User' })
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBe('Update user failed');
  });

  it('handles logout pending action', () => {
    const state = authReducer(undefined, logout.pending('', undefined));

    expect(state.loading).toBe(true);
  });

  it('handles logout success action and clears user', () => {
    localStorage.setItem('refreshToken', 'token');

    const state = authReducer(
      {
        user: { email: 'test@example.com', name: 'Test User' },
        isAuthChecked: true,
        loading: true,
        error: null
      },
      logout.fulfilled(undefined, '', undefined)
    );

    expect(state.loading).toBe(false);
    expect(state.user).toBeNull();
    expect(localStorage.getItem('refreshToken')).toBeNull();
  });

  it('handles logout failed action', () => {
    const error = new Error('Logout failed');

    const state = authReducer(
      {
        user: { email: 'test@example.com', name: 'Test User' },
        isAuthChecked: true,
        loading: true,
        error: null
      },
      logout.rejected(error, '', undefined)
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBe('Logout failed');
  });
});
