package com.ungs.docsys.utils;

import com.ungs.docsys.dtos.AppUserClaimDto;
import com.ungs.docsys.dtos.JobApplicationResumeUserResponseDto;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class ExcelExportUtils {
    public static final String EXPORT_FILENAME_PREFIX = "candidatos_";

    public static Workbook createWorkbookFromTemplate(String templatePath) {
        try (InputStream template = ExcelExportUtils.class.getClassLoader().getResourceAsStream(templatePath)) {
            return new XSSFWorkbook(template);
        } catch (IOException e) {
            throw new RuntimeException("Could not open template: " + templatePath, e);
        }
    }

    public static void writeResumeUserRow(Row row, JobApplicationResumeUserResponseDto dto, AppUserClaimDto appUserClaimDto) {
        row.createCell(0).setCellValue(appUserClaimDto.getFirstName());
        row.createCell(1).setCellValue(appUserClaimDto.getLastName());
        row.createCell(2).setCellValue(appUserClaimDto.getIdentificationType().getCode());
        row.createCell(3).setCellValue(appUserClaimDto.getIdentificationNumber());
        row.createCell(4).setCellValue(appUserClaimDto.getCuilCuit());
        row.createCell(5).setCellValue(appUserClaimDto.getEmail());
        row.createCell(6).setCellValue(appUserClaimDto.getPhone());

        row.createCell(7).setCellValue(dto.getRequirementGlobalCount());
        row.createCell(8).setCellValue(dto.getRequirementMandatoryCount());
        row.createCell(9).setCellValue(dto.getRequirementPreferredCount());

        row.createCell(10).setCellValue(dto.getRequirementGlobalApplied());
        row.createCell(11).setCellValue(dto.getRequirementMandatoryApplied());
        row.createCell(12).setCellValue(dto.getRequirementPreferredApplied());
    }

    public static String generateExportFileName(String title) {
        String sanitizedTitle = title.replaceAll("[^a-zA-Z0-9]", "_");
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss"));
        return EXPORT_FILENAME_PREFIX + sanitizedTitle + "_" + timestamp + ".xlsx";
    }}
