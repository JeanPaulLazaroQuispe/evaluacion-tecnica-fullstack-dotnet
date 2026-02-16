using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using UserManagement.Application.DTOs;
using UserManagement.Application.Interfaces;
using UserManagement.Domain.Entities;

namespace UserManagement.Application.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly AutoMapper.IMapper _mapper;

        public UserService(IUserRepository userRepository, AutoMapper.IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<UserDto>> GetAllAsync()
        {
            var users = await _userRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<UserDto>>(users);
        }

        public async Task<UserDto?> GetByIdAsync(int id)
        {
            var user = await _userRepository.GetByIdAsync(id);
            return _mapper.Map<UserDto>(user);
        }

        public async Task<UserDto> CreateAsync(CreateUserDto createUserDto, string currentUserRole)
        {
            if (createUserDto.Role == "Admin" && currentUserRole != "Admin")
                throw new Exception("No tienes permisos para crear un usuario con rol Administrador");

            if (await _userRepository.GetByUsernameAsync(createUserDto.Username) != null)
                throw new Exception("El nombre de usuario ya está en uso");

            if (await _userRepository.GetByEmailAsync(createUserDto.Email) != null)
                throw new Exception("El correo electrónico ya está en uso");

            var user = _mapper.Map<User>(createUserDto);
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(createUserDto.Password);
            user.CreatedAt = DateTime.UtcNow;
            user.IsActive = true;

            await _userRepository.AddAsync(user);
            return _mapper.Map<UserDto>(user);
        }

        public async Task<bool> UpdateAsync(int id, UpdateUserDto updateUserDto, string currentUserRole)
        {
            if (updateUserDto.Role == "Admin" && currentUserRole != "Admin")
                throw new Exception("No tienes permisos para asignar el rol Administrador");

            var user = await _userRepository.GetByIdAsync(id);
            if (user == null) return false;

            // Verificar si el nuevo email ya lo tiene otro usuario
            var existingEmailUser = await _userRepository.GetByEmailAsync(updateUserDto.Email);
            if (existingEmailUser != null && existingEmailUser.Id != id)
                throw new Exception("El correo electrónico ya está en uso por otro usuario");

            _mapper.Map(updateUserDto, user);

            if (!string.IsNullOrEmpty(updateUserDto.Password))
            {
                user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(updateUserDto.Password);
            }

            await _userRepository.UpdateAsync(user);
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var user = await _userRepository.GetByIdAsync(id);
            if (user == null) return false;

            user.IsActive = false;
            await _userRepository.UpdateAsync(user);
            return true;
        }
    }
}
