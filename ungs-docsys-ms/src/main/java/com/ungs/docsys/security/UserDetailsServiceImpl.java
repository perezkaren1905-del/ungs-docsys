package com.ungs.docsys.security;

import com.ungs.docsys.mappers.AppUserClaimMapper;
import com.ungs.docsys.models.UserInfo;
import com.ungs.docsys.repositories.UserInfoRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {
    private final UserInfoRepository userInfoRepository;
    private final AppUserClaimMapper appUserClaimMapper;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        final UserInfo userInfo = userInfoRepository.findByAppUser_Email(email).orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
        return new AppUserDetails(appUserClaimMapper.toDto(userInfo));
    }

}
