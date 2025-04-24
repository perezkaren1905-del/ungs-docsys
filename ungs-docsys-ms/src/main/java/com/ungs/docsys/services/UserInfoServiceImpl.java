package com.ungs.docsys.services;

import com.ungs.docsys.dtos.UserInfoRequestDto;
import com.ungs.docsys.mappers.IdentificationTypeMapper;
import com.ungs.docsys.mappers.NationalityMapper;
import com.ungs.docsys.models.*;
import com.ungs.docsys.repositories.AppUserRepository;
import com.ungs.docsys.repositories.UserInfoRepository;
import com.ungs.docsys.repositories.UserRoleRepository;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserInfoServiceImpl implements UserInfoService {
    private static final Logger logger = LoggerFactory.getLogger(UserInfoServiceImpl.class);

    private final AppUserRepository appUserRepository;
    private final UserInfoRepository userInfoRepository;
    private final UserRoleRepository userRoleRepository;

    private IdentificationTypeService identificationTypeService;
    private NationalityService nationalityService;
    private RoleService roleService;

    private IdentificationTypeMapper identificationTypeMapper;
    private NationalityMapper nationalityMapper;

    private final PasswordEncoder passwordEncoder;

    @Override
    public void signUp(UserInfoRequestDto request) {
        logger.info("Signing up user with email: {}", request.getEmail());

        IdentificationType identificationType = identificationTypeMapper.toModel(
                identificationTypeService.getById(request.getIdentificationTypeId()));
        Nationality nationality = nationalityMapper.toModel(
                nationalityService.getById(request.getNationalityId()));
        Role role = roleService.findById(request.getRoleId());

        AppUser appUser = AppUser.builder()
                .email(request.getEmail())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .active(true)
                .build();
        appUserRepository.save(appUser);

        UserRole userRole = UserRole.builder()
                .appUser(appUser)
                .role(role)
                .build();
        userRoleRepository.save(userRole);

        UserInfo userInfo = UserInfo.builder()
                .appUser(appUser)
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .identificationType(identificationType)
                .identificationNumber(request.getIdentificationNumber())
                .phone(request.getPhone())
                .birthDate(request.getBirthDate())
                .nationality(nationality)
                .build();
        userInfoRepository.save(userInfo);
    }
}
