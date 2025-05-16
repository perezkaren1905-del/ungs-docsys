package com.ungs.docsys.dtos;

import lombok.Data;

@Data
public class NationalityResponseDto {
    private Long id;
    private String code;
    private String description;
    private String iso2;
    private String iso3;
}
