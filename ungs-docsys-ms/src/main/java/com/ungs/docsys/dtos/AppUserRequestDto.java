package com.ungs.docsys.dtos;

import lombok.Data;

@Data
public class AppUserRequestDto {
    private String email;
    private String password;
}
